# Portfolio Web App

This project is a personal portfolio web application showcasing my journey in software development so far using only vanilla Go and some JavaScript for dynamic interactions on the front-end. It is built using Go for the backend server and vanilla JavaScript. I then dockerize the application and hosted it on Render. You can view the live portfolio [here](https://portfolio-7eww.onrender.com).

## Tech Stack:
Backend: Go

Frontend: Vanilla JavaScript, CSS, and HTML

Deployment: Docker, Render

## How to Clone and Run Locally

To clone the repository and run it locally, follow these steps:

### Prerequisites
Make sure you have Go ann/or Docker installed on your system.

### Steps

Clone the repository:
```bash
git clone https://github.com/HilaryOkello/portfolio.git
cd portfolio
```

### Run the app locally with Go:
```bash
go run main.go
```
This will start the server on http://localhost:8000. You can access it by opening this URL in your browser.

### Run with Docker:

If you prefer to run the app inside a Docker container, you can build and start the container using:

```bash
docker build -t portfolio-app .
docker run -p 8000:8000 portfolio-app
```
The app will be available at http://localhost:8000.

## How It Works:
The Go backend serves static files (CSS, JS, images) and renders the main portfolio page and do some basic error handling. The frontend uses JavaScript to enhance the user experience such as interactive carousels and a responsive navigation menu. I then used Docker to ensure consistent environments for both development and production.

[License](./LICENSE)

