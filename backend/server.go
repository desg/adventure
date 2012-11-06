package server

import "net/http"

const Root = ""

func init() {
	http.Handle("/", http.FileServer(http.Dir(Root+"/public")))
}
