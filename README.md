# linearify

Takes a 2D spritesheet and converts it to a horizontal spritesheet. Useful for CSS spritesheet animations

### Example Usage

`node index.js -x 8 -y 14 path/to/current.png -o new_image.png -a animations.json`

* x = number of frame columns
* y = number of frame rows
* o = new image output (optional, defaults to out.png)
* a = animations json input (optional)

### Sample animations input

```
{
    "idle": {
        "start": 0,
        "end": 5,
        "speed": 2
    }
}
```
