import os
import struct
import zlib
import math

def create_png(width, height, is_maskable=False):
    # RGBA image buffer
    raw_data = bytearray()
    
    center_x = width / 2.0
    center_y = height / 2.0
    radius = min(width, height) * (0.35 if is_maskable else 0.45)
    
    # Generate Aura Wealth Logo: Deep Navy gradient background + Cyan/Sky luminous emblem
    for y in range(height):
        raw_data.append(0) # Filter byte: None
        ny = (y - center_y) / (height / 2.0)
        for x in range(width):
            nx = (x - center_x) / (width / 2.0)
            dist = math.sqrt(nx * nx + ny * ny)
            
            # Background: Deep sleek obsidian navy (#030712 to #0f172a)
            r = int(3 + (y / height) * 12)
            g = int(7 + (y / height) * 16)
            b = int(18 + (y / height) * 24)
            a = 255
            
            # Subtle outer glow
            if dist < 0.8:
                glow = (1.0 - dist / 0.8) * 0.3
                r = int(r * (1 - glow) + 14 * glow)
                g = int(g * (1 - glow) + 165 * glow)
                b = int(b * (1 - glow) + 233 * glow)

            # Central Rounded Diamond / Shield Emblem
            # |nx| + |ny| <= 0.55
            diamond_dist = abs(nx) + abs(ny)
            if diamond_dist < 0.52 and diamond_dist > 0.40:
                # Cyan ring
                r, g, b = 56, 189, 248 # #38bdf8
            elif diamond_dist <= 0.40 and diamond_dist >= 0.25:
                # Indigo body
                r, g, b = 99, 102, 241 # #6366f1
            elif diamond_dist < 0.25:
                # Core star / spark
                star_dist = math.sqrt(nx * nx + ny * ny)
                if star_dist < 0.12 or (abs(nx) < 0.03 and abs(ny) < 0.22) or (abs(ny) < 0.03 and abs(nx) < 0.22):
                    r, g, b = 255, 255, 255
                else:
                    r, g, b = 34, 211, 238 # #22d3ee
                    
            raw_data.extend([r, g, b, a])
            
    # Assemble PNG chunks
    def chunk(chunk_type, data):
        c = chunk_type + data
        crc = struct.pack(">I", zlib.crc32(c) & 0xffffffff)
        return struct.pack(">I", len(data)) + c + crc

    png = b"\x89PNG\r\n\x1a\n"
    # IHDR: width, height, bit_depth=8, color_type=6 (RGBA), compression=0, filter=0, interlace=0
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png += chunk(b"IHDR", ihdr_data)
    
    # IDAT
    compressed_data = zlib.compress(bytes(raw_data), level=9)
    png += chunk(b"IDAT", compressed_data)
    
    # IEND
    png += chunk(b"IEND", b"")
    return png

os.makedirs("public", exist_ok=True)

# Generate pwa-192x192.png
with open("public/pwa-192x192.png", "wb") as f:
    f.write(create_png(192, 192, is_maskable=False))

# Generate pwa-512x512.png
with open("public/pwa-512x512.png", "wb") as f:
    f.write(create_png(512, 512, is_maskable=False))

# Generate pwa-maskable-512x512.png
with open("public/pwa-maskable-512x512.png", "wb") as f:
    f.write(create_png(512, 512, is_maskable=True))

# Generate apple-touch-icon.png (180x180)
with open("public/apple-touch-icon.png", "wb") as f:
    f.write(create_png(180, 180, is_maskable=False))

# Generate favicon.png (64x64)
with open("public/favicon.png", "wb") as f:
    f.write(create_png(64, 64, is_maskable=False))

print("All PWA icons generated successfully in public/!")
