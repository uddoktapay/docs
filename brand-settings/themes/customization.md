# Theme Customization

Theme customization fields are **dynamic** and depend on the active theme.  
This guide explains common options and advanced customization.

## Colors

### Global Colors
- **Text Color** → Default text color.

### Buttons
- **Button Background** → Background color of primary buttons.
- **Button Text** → Text color of primary buttons.
- **Button Hover Background** → Color when hovering over buttons.
- **Button Hover Text** → Text color when hovering.

### Navigation
- **Main Navigation Background** → Background color for the navigation bar.
- **Main Navigation Text** → Default text color in navigation.
- **Active Tab Background** → Background color for the active tab.
- **Active Tab Text** → Text color for the active tab.
- **Footer Navigation Background** → Footer background color.
- **Footer Navigation Text** → Footer text color.

## Advanced Custom Code

Switch to the **Custom Code** tab for advanced customization.

### Global CSS
Add **raw CSS rules** that apply across all pages.  
_Do not wrap inside `<style>` tags._

```css
.checkout-title {
  font-size: 20px;
  color: #1a73e8;
}
````

### Global JavaScript

Add **raw JavaScript** that runs across all pages.
*Do not wrap inside `<script>` tags.*

```javascript
console.log("Checkout page loaded!");
```

### Page-Specific Code

* **Checkout Page Code** → Runs only on checkout pages.
* **Gateway Page Code** → Runs only on gateway pages.
* **Payment Link Page Code** → Runs only on payment link pages.

⚠️ Use with caution: invalid code may break your UI.

---

## Next Steps

* [Back to Themes Overview](./index.md)
* [Developer Guide](./developer-guide.md) → (Coming soon) Build your own custom theme.