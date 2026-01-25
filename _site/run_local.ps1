# Run Jekyll locally using Docker
echo "Starting Jekyll server at http://localhost:4000..."
echo "Press Ctrl+C to stop."

docker run --rm `
  --volume "${PWD}:/srv/jekyll" `
  -p 4000:4000 `
  jekyll/jekyll:4.2.2 `
  jekyll serve --watch --force_polling
