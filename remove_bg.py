from PIL import Image

def process_cloud(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We found the background checkerboard has maximum RGB values around 58.
    threshold = 65 
    
    new_data = []
    for pixel in img.getdata():
        r, g, b, a = pixel
        # Calculate luminance (simple average)
        L = (r + g + b) / 3.0
        
        if L <= threshold:
            # Completely transparent for the background checkerboard
            new_data.append((r, g, b, 0))
        else:
            # Smoothly ramp the alpha from 0 (at threshold) to 255 (at white)
            # This preserves the soft edges of the cloud!
            alpha = int(min(255, (L - threshold) * 255.0 / (255.0 - threshold)))
            
            # Optionally, we can make the cloud pure white, or keep its natural color.
            # Keeping natural color makes it look more realistic.
            # But the dark shadows will now be semi-transparent.
            # To compensate, let's boost the RGB slightly so the cloud stays bright
            boost_r = int(min(255, r * 1.2))
            boost_g = int(min(255, g * 1.2))
            boost_b = int(min(255, b * 1.2))
            
            new_data.append((boost_r, boost_g, boost_b, alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_cloud(
        r"c:\Users\USER\Desktop\html\Airwall\public\cloud.png",
        r"c:\Users\USER\Desktop\html\Airwall\public\cloud.png"
    )
    print("Background removed successfully!")
