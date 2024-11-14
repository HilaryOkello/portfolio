package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"text/template"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		log.Printf("Method not allowed")
		return
	}
	if r.URL.Path != "/" {
		errorPage(w, http.StatusNotFound)
		return
	}
	templ, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Printf("Error Parsing Template")
		return
	}
	templ.Execute(w, nil)
}

func serveStatic(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		errorPage(w, http.StatusMethodNotAllowed)
		return
	}
	// Remove the /static/ prefix from the URL path
	filePath := path.Join("static", strings.TrimPrefix(r.URL.Path, "/static/"))

	// Check if the file exists and is not a directory
	info, err := os.Stat(filePath)
	if err != nil || info.IsDir() {
		errorPage(w, http.StatusNotFound)
		return
	}

	// Check the file extension
	ext := filepath.Ext(filePath)
	switch ext {
	case ".css":
		w.Header().Set("Content-Type", "text/css")
	case ".js":
		w.Header().Set("Content-Type", "application/javascript")
	case ".png":
		w.Header().Set("Content-Type", "image/png")
	case ".jpg", ".jpeg":
		w.Header().Set("Content-Type", "image/jpeg")
	case ".otf":
		w.Header().Set("Content-Type", "font/otf")
	case ".svg":
		w.Header().Set("Content-Type", "image/svg+xml")
	default:
		errorPage(w, http.StatusNotFound)
		return
	}

	// Serve the file
	http.ServeFile(w, r, filePath)
}

// errorPage renders an error page based on the HTTP status code.
func errorPage(w http.ResponseWriter, code int) {
	var message string
	switch code {
	case http.StatusNotFound:
		message = "Not Found"
	case http.StatusBadRequest:
		message = "Bad Request"
	case http.StatusMethodNotAllowed:
		message = "Method Not Allowed"
	case http.StatusForbidden:
		message = "Forbidden"
	default:
		message = "Internal Server Error"
	}
	data := struct{
		Title   string
        Status  int
        Message string
	}{
		Title:   "Error",
		Status:  code,
		Message: message,
	}

	// Set HTTP response status code
	w.WriteHeader(code)
	tmpl, err := template.ParseFiles("templates/error.html")
	// Serve basic error response if template parsing fails
	if err != nil {
		http.Error(w, fmt.Sprintf("%d - %s", code, message), code)
		return
	}

	// Serve basic error response if template execution fails
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, fmt.Sprintf("%d - %s", code, message), code)
	}
}

func main() {
	http.HandleFunc("/static/", serveStatic)
	http.HandleFunc("/", homeHandler)
	log.Println("Success. Server listening on port 8000")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Println("Failed to start server")
	}
}
