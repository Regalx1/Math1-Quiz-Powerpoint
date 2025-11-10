from PIL import Image, ImageDraw
import math

# Color palette
COLORS = {
    'shapeCorrect': '#66B3FF',
    'shapeIncorrect': '#FF9999'
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def draw_hexagon(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw a regular hexagon"""
    points = []
    for i in range(6):
        angle = math.pi / 3 * i - math.pi / 6
        px = x + size * math.cos(angle)
        py = y + size * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=3)

def draw_triangle(draw, x, y, size, fill_color, outline_color='#000000', rotation=0):
    """Draw an equilateral triangle with optional rotation"""
    h = size * math.sqrt(3) / 2
    points = [(0, 0), (size, 0), (size/2, h)]

    if rotation != 0:
        angle = math.radians(rotation)
        cos_a, sin_a = math.cos(angle), math.sin(angle)
        cx, cy = size/2, h/2
        rotated_points = []
        for px, py in points:
            px_centered = px - cx
            py_centered = py - cy
            new_x = px_centered * cos_a - py_centered * sin_a
            new_y = px_centered * sin_a + py_centered * cos_a
            rotated_points.append((new_x + cx, new_y + cy))
        points = rotated_points

    final_points = [(x + px, y + py) for px, py in points]
    draw.polygon(final_points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=3)

def draw_parallelogram(draw, x, y, width, height, skew, fill_color, outline_color='#000000'):
    """Draw a parallelogram"""
    points = [
        (x + skew, y),
        (x + width + skew, y),
        (x + width, y + height),
        (x, y + height)
    ]
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=3)

def draw_square(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw a square"""
    draw.rectangle([x, y, x + size, y + size], fill=hex_to_rgb(fill_color),
                   outline=hex_to_rgb(outline_color), width=3)

# Q6 Answer Images (400x300 each)
def create_q6_answers():
    """Create 4 answer images for Q6: Hexagon + Triangle"""

    # Answer A - Triangle on right edge
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)  # Make background transparent
    draw = ImageDraw.Draw(img)
    draw_hexagon(draw, 150, 150, 50, COLORS['shapeIncorrect'])
    draw_triangle(draw, 210, 135, 55, COLORS['shapeIncorrect'], rotation=90)
    img.save('previews/q6-answer-a.png')

    # Answer B - Triangle on top (CORRECT)
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_hexagon(draw, 200, 200, 50, COLORS['shapeCorrect'])
    draw_triangle(draw, 185, 120, 60, COLORS['shapeCorrect'], rotation=180)
    img.save('previews/q6-answer-b.png')

    # Answer C - Triangle on bottom-left edge
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_hexagon(draw, 200, 120, 50, COLORS['shapeIncorrect'])
    draw_triangle(draw, 150, 180, 55, COLORS['shapeIncorrect'], rotation=240)
    img.save('previews/q6-answer-c.png')

    # Answer D - Triangle on bottom edge
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_hexagon(draw, 200, 120, 50, COLORS['shapeIncorrect'])
    draw_triangle(draw, 185, 185, 60, COLORS['shapeIncorrect'], rotation=0)
    img.save('previews/q6-answer-d.png')

    print("✓ Created Q6 answer images (A, B, C, D)")

# Q7 Answer Images (400x300 each)
def create_q7_answers():
    """Create 4 answer images for Q7: Parallelogram + Square"""

    # Answer A - Square on right edge
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_parallelogram(draw, 120, 130, 100, 60, 25, COLORS['shapeIncorrect'])
    draw_square(draw, 220, 125, 60, COLORS['shapeIncorrect'])
    img.save('previews/q7-answer-a.png')

    # Answer B - Square on left edge
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_square(draw, 120, 125, 60, COLORS['shapeIncorrect'])
    draw_parallelogram(draw, 180, 130, 100, 60, 25, COLORS['shapeIncorrect'])
    img.save('previews/q7-answer-b.png')

    # Answer C - Stacked vertically (CORRECT)
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_parallelogram(draw, 150, 100, 100, 60, 25, COLORS['shapeCorrect'])
    draw_square(draw, 165, 165, 60, COLORS['shapeCorrect'])
    img.save('previews/q7-answer-c.png')

    # Answer D - Square on top
    img = Image.new('RGB', (400, 300), (30, 30, 30, 0))
    img.putalpha(0)
    draw = ImageDraw.Draw(img)
    draw_square(draw, 165, 90, 60, COLORS['shapeIncorrect'])
    draw_parallelogram(draw, 150, 155, 100, 60, 25, COLORS['shapeIncorrect'])
    img.save('previews/q7-answer-d.png')

    print("✓ Created Q7 answer images (A, B, C, D)")

if __name__ == "__main__":
    print("Generating individual answer images for Q6 and Q7...")
    create_q6_answers()
    create_q7_answers()
    print("\nAll answer images generated!")
    print("- q6-answer-a.png, q6-answer-b.png, q6-answer-c.png, q6-answer-d.png")
    print("- q7-answer-a.png, q7-answer-b.png, q7-answer-c.png, q7-answer-d.png")
