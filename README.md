# MURA

MURA is a group scheduling tool. It's similar in functionality to services like when2meet, but features a more modern interface that better supports mobile (and other various screen sizes). You can host it yourself using Docker.

## Features

- MURA events display for participant's local timezones
- Create MURA events for specific days and times
- Add extra meeting details compared to other services
- Get a MURA Suggested Meeting time and date in-app

## Server Load

MURA features an API written in Go and a SvelteKit frontend using a Deno community adapter. This means it's cheaper to run than a traditional Node service - with a total Docker image size of about 150MB and about 35MB combined RAM usage (on a container limited to 512MB).

## License

MIT