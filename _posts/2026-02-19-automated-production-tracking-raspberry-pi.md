---
layout: post
title: "Automated Production Tracking and Monitoring System using Raspberry Pi"
date: 2026-02-19
categories: [IoT, Manufacturing, Raspberry Pi, Automation]
---

In the fast-paced world of manufacturing, knowing exactly how much you're producing in real-time is not just a "nice-to-have"—it's a game-changer. Manual counting is prone to errors, and lagging data means you're always reacting to yesterday's problems.

Today, I’m going to show you how to build a robust, **Automated Production Tracking and Monitoring System** using a Raspberry Pi and some simple sensors. This system will give you real-time visibility into your production lines, helping you calculate OEE (Overall Equipment Effectiveness) and identify bottlenecks instantly.

## The Hardware: Simplicity Meets Power

You don't need expensive industrial PLCs to get started. The Raspberry Pi is more than capable of handling high-speed counting and data transmission.

### What You'll Need:
*   **Raspberry Pi 4 (or 3B+)**: The brain of the operation.
*   **IR Obstacle / Proximity Sensor**: To detect products moving on the conveyor belt.
*   **Jumper Wires**: For connecting the sensor to the GPIO pins.
*   **Breadboard (Optional)**: For prototyping.

### Wiring It Up
Connect your IR sensor to the Raspberry Pi:
*   **VCC** -> 5V (Pin 2)
*   **GND** -> GND (Pin 6)
*   **OUT** -> GPIO 23 (Pin 16)

*Note: Most IR sensors have a digital output that goes LOW when an object is detected. Ensure your sensor is compatible with the Pi's 3.3V logic or use a level shifter.*

## The Software Stack: Logic, Data, and Visuals

We'll use a modern IoT stack to keep things modular and scalable.

1.  **Python**: Controls the GPIO and counts the interrupts.
2.  **MQTT (Mosquitto)**: A lightweight messaging protocol to transport data.
3.  **InfluxDB**: A time-series database perfect for sensor data.
4.  **Grafana**: The dashboard to visualize our production metrics.

### Step 1: The Python Counting Script

We'll use the `GPIO Zero` library for its clean syntax. Instead of a loop that checks the pin state (polling), we'll use **interrupts**. This ensures we never miss a fast-moving product.

```python
import time
import json
import paho.mqtt.client as mqtt
from gpiozero import Button

# Configuration
SENSOR_PIN = 23
MQTT_BROKER = "localhost"
MQTT_TOPIC = "factory/line1/production"

# Initialize variables
product_count = 0
last_count_time = time.time()

# MQTT Setup
client = mqtt.Client()
client.connect(MQTT_BROKER, 1883, 60)

def count_product():
    global product_count, last_count_time
    current_time = time.time()
    
    # Simple software debounce
    if (current_time - last_count_time) > 0.1:
        product_count += 1
        last_count_time = current_time
        
        payload = json.dumps({
            "timestamp": current_time,
            "count": product_count,
            "line_id": "Line-1"
        })
        
        client.publish(MQTT_TOPIC, payload)
        print(f"Product Detected! Total: {product_count}")

# Initialize Sensor (Pull up resistor ensures stable high state)
# We treat the sensor like a button: Pressed = Object Detected (Low signal)
sensor = Button(SENSOR_PIN, pull_up=True)

# Assign interrupt event
sensor.when_pressed = count_product

print("Production Monitoring Started...")

try:
    # Keep the script running
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print("Stopping Production Monitor")
    client.disconnect()
```

### Step 2: Data Pipeline with MQTT and InfluxDB
Once the Python script publishes data to MQTT, you need a service to pick it up and save it. Telegraf is a great tool for this. It can subscribe to the `factory/line1/production` topic and write the JSON payload directly into InfluxDB.

### Step 3: Visualizing with Grafana
This is where the magic happens. Connect Grafana to your InfluxDB source. You can now create panels for:
*   **Real-time Count**: The raw number of products produced today.
*   **Production Rate**: Calculate parts per minute (PPM) using the time difference between counts.
*   **Availability**: Compare active production time vs. downtime.

## Why This Matters
By implementing this system, you move from "I think we did okay today" to "We operated at 85% efficiency between 10 AM and 2 PM."

*   **Low Cost**: A fraction of the price of industrial SCADA systems.
*   **Scalable**: Just add more Pis for more lines.
*   **Open Data**: You own the data; specific proprietary formats don't lock you in.

## Conclusion
Building an automated tracking system is a fantastic project that delivers immediate business value. It bridges the gap between physical manufacturing and digital intelligence.

Ready to try it? Grab a Raspberry Pi and start counting!
