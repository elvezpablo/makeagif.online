# makeagif.online - MaGO 

[https://makeagif-online.vercel.app/](https://makeagif-online.vercel.app/)

Fully client side gif encoding using the awesome [WASM FFMPEG](https://github.com/ffmpegwasm/ffmpeg.wasm) encoder. 

## Roadmap

- 1.0 
  - [ ] Design 
    - [ ] https://icons.mono.company/
    - [ ] https://teenyicons.com/
    - [ ] https://heroicons.com/
  - [ ] Options (loop, resize, fps)
  - [ ] Informative Errors
    - [ ] https://swizec.com/blog/tooltips-tooltips-are-not-so-easy
  - [ ] Analytics
- 1.1 
  - [ ] Options
    - [ ] Clipping with slider http://zillow.github.io/react-slider/



## Current Issues: 

1. Only works in Chrome, trying to get right headers for Firefox in vercel but they are not updating, will revisit. 
2. Does not work in mobile, could be drag and drop upload library

### About the name MaGO

> The Philippine tarsier (Carlito syrichta), known locally as mawumag in Cebuano and other Visayan languages, and magô in Waray, is a species of tarsier endemic to the Philippines.

https://en.wikipedia.org/wiki/Philippine_tarsier
## Research and References

* https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
* https://vercel.com/docs/configuration#project/headers
* https://stackoverflow.com/questions/15464896/get-cpu-gpu-memory-information
* https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md

### Additional Options
* https://medium.com/@colten_jackson/doing-the-gif-thing-on-debian-82b9760a8483
