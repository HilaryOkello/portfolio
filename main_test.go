package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
)

func TestHomeHandler(t *testing.T) {

	tests := []struct {
		name          string
		method        string
		path          string
		expectedCode  int
	}{
		{
			name:          "Valid GET request",
			method:        http.MethodGet,
			path:          "/",
			expectedCode:  http.StatusOK,
		},
		{
			name:         "Wrong method",
			method:       http.MethodPost,
			path:         "/",
			expectedCode: http.StatusMethodNotAllowed,
		},
		{
			name:         "Wrong path",
			method:       http.MethodGet,
			path:         "/wrong",
			expectedCode: http.StatusNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create request
			req := httptest.NewRequest(tt.method, tt.path, nil)

			// Create response recorder
			w := httptest.NewRecorder()

			// Call the handler
			homeHandler(w, req)

			// Check status code
			if w.Code != tt.expectedCode {
				t.Errorf("homeHandler() status code = %v, want %v", w.Code, tt.expectedCode)
			}
		})
	}
}

func TestErrorPage(t *testing.T) {
	tests := []struct {
		name     string
		code     int
		expected string
	}{
		{"Not Found", http.StatusNotFound, "Not Found"},
		{"Bad Request", http.StatusBadRequest, "Bad Request"},
		{"Method Not Allowed", http.StatusMethodNotAllowed, "Method Not Allowed"},
		{"Internal Server Error", http.StatusInternalServerError, "Internal Server Error"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			errorPage(w, tt.code)
			if w.Code != tt.code {
				t.Errorf("Expected status code %d, got %d", tt.code, w.Code)
			}
			if !strings.Contains(w.Body.String(), tt.expected) {
				t.Errorf("Expected body %s, got %s,", tt.expected, w.Body.String())
			}
		})
	}
}

func TestServeStatic_Success(t *testing.T) {
	// Create a response recorder
	w := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "/static/styles.css", nil)
	// Call the handler function
	serveStatic(w, r)
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}
	responseBody := w.Body.Bytes()
	// Read the expected content from the file
	expectedContent, err := os.ReadFile("static/styles.css")
	if err != nil {
		t.Fatalf("Failed to read expected content from file: %v", err)
	}
	if !bytes.Equal(responseBody, expectedContent) {
		t.Errorf("Expected response body to match the image file content")
	}
}

func TestServeStatic_Forbidden(t *testing.T) {
	// Create a response recorder
	w := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "/static/nonexistent.txt", nil)
	serveStatic(w, r)
	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status code %d, got %d", http.StatusNotFound, w.Code)
	}
	responseBody := w.Body.String()
	expectedErrorMessage := "Not Found"
	if !strings.Contains(responseBody, expectedErrorMessage) {
		t.Errorf("Expected response body to contain '%s', but it didn't", expectedErrorMessage)
	}
}

func TestServeStatic_DirectoryHandling(t *testing.T) {
	// Create a response recorder
	w := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "/static/", nil)
	serveStatic(w, r)
	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status code %d, got %d", http.StatusNotFound, w.Code)
	}
	responseBody := w.Body.String()
	expectedErrorMessage := "Not Found"
	if !strings.Contains(responseBody, expectedErrorMessage) {
		t.Errorf("Expected response body to contain '%s', but it didn't", expectedErrorMessage)
	}
}
