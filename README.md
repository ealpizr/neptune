# Neptune

Real-time chat application built using Svelte and Golang.

This project uses the gRPC protocol for communication; since
it's not natively supported on browsers, a proxy bridge
for transcoding data to the HTTP protocol is required.

Neptune is separated into 3 services running on Docker:

- Backend (Golang & gRPC)
- Frontend (React)
- Proxy (Envoy, transcodes gRPC into HTTP)

**I could not find a way to host Docker containers for free, so there is no demo available.**

_If you'd like to try this out, you need to run it yourself_

## Screenshots

Login
![Login Page](https://raw.githubusercontent.com/ealpizr/neptune/main/images/Login.jpg)

Home Page
![Home Page](https://raw.githubusercontent.com/ealpizr/neptune/main/images/Home.jpg)

Responsive Chat Page

![Responsive Chat Page](https://raw.githubusercontent.com/ealpizr/neptune/main/images/Responsive.jpg)

## Contributing

Pull requests are welcome.

## License

[MIT](https://opensource.org/licenses/MIT)
