'use strict'

export const color_dict = {
  primary_bg: 'black',
  primary_fg: 'aliceblue',
  text_color: 'white'
}

export const background_dicts = [
  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=)",
  "linear-gradient(to right, #a18cd1, #fbc2eb)",
  "linear-gradient(to right, #6a11cb, #2575fc)",
  "linear-gradient(to right, #4cb8c4, #3cd3ad)",
  "linear-gradient(to right, #16a085, #f4d03f)",
  "linear-gradient(to right, #fd5e53, #f9cb28)",
  "linear-gradient(to right, #6a85b6, #bac8e0)",
  "linear-gradient(to right, #ffecd2, #fcb69f)",
  "linear-gradient(to right, #d1913c, #ffd194)",
  "linear-gradient(to right, #314755, #26a0da)",
  "linear-gradient(to right, #f2994a, #f2c94c)",
  "linear-gradient(to right, #e14fad, #f9d423)",
  "linear-gradient(to right, #e44d26, #f16529)",
  "linear-gradient(to right, #8e2de2, #4a00e0)",
  "linear-gradient(to right, #56ab2f, #a8e063)",
  "linear-gradient(to right, #fc4a1a, #f7b733)",
  "linear-gradient(to right, #ff416c, #ff4b2b)",
  "linear-gradient(to right, #2c3e50, #4ca1af)",
  "linear-gradient(to right, #654ea3, #eaafc8)",
  "linear-gradient(to right, #c33764, #1d2671)"
];


export const background_dicts1 = [
  "linear-gradient(to right, #ff9966, #ff5e62)", // Gradient
  "linear-gradient(to right, #a18cd1, #fbc2eb)", // Gradient
  "#6a11cb", // Solid color
  "#4cb8c4", // Solid color
  "linear-gradient(to right, #16a085, #f4d03f)", // Gradient
  "#fd5e53", // Solid color
  "radial-gradient(circle, #ffffff, #6a85b6)", // Radial gradient
  "linear-gradient(to right, #ffecd2, #fcb69f)", // Gradient
  "#ffd194", // Solid color
  "linear-gradient(to right, #314755, #26a0da)", // Gradient
  "#f2994a", // Solid color
  "radial-gradient(circle, #e14fad, #f9d423)", // Radial gradient
  "#f16529", // Solid color
  "linear-gradient(to right, #8e2de2, #4a00e0)", // Gradient
  "linear-gradient(to right, #56ab2f, #a8e063)", // Gradient
  "#fc4a1a", // Solid color
  "#ff4b2b", // Solid color
  "#2c3e50", // Solid color
  "radial-gradient(circle, #654ea3, #eaafc8)", // Radial gradient
  "#c33764" // Solid color
];


export const box_shadows_dict = [
  'inset 0 0 50px #fff, inset 20px 0 80px #f0f, inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff, 0 0 50px #fff, -10px 0 80px #f0f, 10px 0 80px #0ff',
  'inset 0 0 50px #fff, inset 25px 0 100px #f0f, inset -25px 0 100px #0ff, inset 25px 0 350px #f0f, inset -25px 0 350px #0ff, 0 0 50px #fff, -12px 0 100px #f0f, 12px 0 100px #0ff',
  'inset 0 0 50px #fff, inset 30px 0 120px #f0f, inset -30px 0 120px #0ff, inset 30px 0 400px #f0f, inset -30px 0 400px #0ff, 0 0 50px #fff, -14px 0 120px #f0f, 14px 0 120px #0ff',
  'inset 0 0 50px #fff, inset 35px 0 140px #f0f, inset -35px 0 140px #0ff, inset 35px 0 450px #f0f, inset -35px 0 450px #0ff, 0 0 50px #fff, -16px 0 140px #f0f, 16px 0 140px #0ff',
  'inset 0 0 50px #fff, inset 40px 0 160px #f0f, inset -40px 0 160px #0ff, inset 40px 0 500px #f0f, inset -40px 0 500px #0ff, 0 0 50px #fff, -18px 0 160px #f0f, 18px 0 160px #0ff',
  'inset 0 0 50px #fff, inset 45px 0 180px #f0f, inset -45px 0 180px #0ff, inset 45px 0 550px #f0f, inset -45px 0 550px #0ff, 0 0 50px #fff, -20px 0 180px #f0f, 20px 0 180px #0ff',
  'inset 0 0 50px #fff, inset 50px 0 200px #f0f, inset -50px 0 200px #0ff, inset 50px 0 600px #f0f, inset -50px 0 600px #0ff, 0 0 50px #fff, -22px 0 200px #f0f, 22px 0 200px #0ff',
  'inset 0 0 50px #fff, inset 55px 0 220px #f0f, inset -55px 0 220px #0ff, inset 55px 0 650px #f0f, inset -55px 0 650px #0ff, 0 0 50px #fff, -24px 0 220px #f0f, 24px 0 220px #0ff',
  'inset 0 0 50px #fff, inset 60px 0 240px #f0f, inset -60px 0 240px #0ff, inset 60px 0 700px #f0f, inset -60px 0 700px #0ff, 0 0 50px #fff, -26px 0 240px #f0f, 26px 0 240px #0ff',
  'inset 0 0 50px #fff, inset 65px 0 260px #f0f, inset -65px 0 260px #0ff, inset 65px 0 750px #f0f, inset -65px 0 750px #0ff, 0 0 50px #fff, -28px 0 260px #f0f, 28px 0 260px #0ff'
];


export const neon_classes = [
  'neon-red',
  'neon-pink',
  'neon-purple',
  'neon-blue',
  'neon-green',
  'neon-yellow',
  'neon-white',
]
