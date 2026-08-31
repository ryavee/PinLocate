# 📍 PinLocate

PinLocate is a lightweight, responsive React web application that automatically fetches and populates locality, district, and state details from any 6-digit Indian Postal PIN code using the Postal PIN Code API.

---

## ✨ Features

- **PIN Code Lookup:** Fetches address information when a valid 6-digit PIN code is entered.
- **Dynamic Locality Selection:** Populates all available post offices / sub-localities in a dropdown with office branch details.
- **Auto-Populated District & State:** Automatically resolves and fills district and state fields.
- **Quick Preset PINs:** 1-click test pills for major cities (New Delhi, Bengaluru, Mumbai, Chennai, Kolkata).
- **Digit Counter & Input Validation:** Real-time numeric sanitization, 6-digit length tracking, and quick clear (`✕`) action.
- **Verified Address Summary:** Displays a formatted address card upon confirmation with a 1-click copy-to-clipboard button.
- **Loading Overlay & Spinner:** Non-blocking visual indicator during postal record retrieval.
- **Clear Error Handling:** User-friendly messages for unknown PIN codes and connection issues.
- **Reset / Search Again:** Seamlessly resets form fields to search another location without reloading the page.
- **Accessible & Responsive UI:** Built with accessible form labeling, keyboard navigation support, and optimized layouts for mobile and desktop screens.

---

## 🖥️ Demo

- **Live Demo:** [https://pin-locate.vercel.app/](https://pin-locate.vercel.app/)
- **Repository:** [https://github.com/ryavee/PinLocate](https://github.com/ryavee/PinLocate)

---

## 📸 Screenshots

<p align="center">
  <img width="420" height="720" alt="pinLocate Interface" src="https://github.com/user-attachments/assets/0bdebd8d-4aa5-405c-86f3-b27309d638b8" />
  <span />
  <img width="420" height="720" alt="pin-locate vercel app_ (1)" src="https://github.com/user-attachments/assets/da0bcc92-4e91-4ecd-8c9f-471c332bb96b" />

</p>

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Styling:** Custom CSS with CSS Variables / Design Tokens
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (Font Awesome 5/6)
- **Data Source:** [India Post Postal PIN Code API](https://postalpincode.in/Api-Details)
- **Deployment:** [Vercel](https://vercel.com/) / Static Hosting

---

## 🔄 How It Works

```text
User Enters 6-Digit PIN
          ↓
  Sanitize & Validate
          ↓
  Query Postal API
  (api.postalpincode.in)
          ↓
  Parse Post Offices
          ↓
  Auto-Select First Locality
  & Auto-Fill District / State
          ↓
  User Confirms & Copies Address
```

1. **Input:** The user types a 6-digit PIN code or selects a sample PIN.
2. **Validation:** Non-numeric characters are removed and no request is made until all six digits are present.
3. **Fetch:** Once 6 digits are entered, an asynchronous `fetch()` request is sent to `https://api.postalpincode.in/pincode/{pincode}`.
4. **Populate:** The dropdown lists all branch post offices returned for that PIN code, while District and State are populated automatically.
5. **Selection & Confirmation:** Changing the locality dynamically synchronizes related district/state details. Submitting generates a verified summary with a copy-to-clipboard action.

---

## 📦 Installation & Setup

To run PinLocate locally:

```bash
# 1. Clone the repository
git clone https://github.com/ryavee/PinLocate.git

# 2. Navigate to the project directory
cd PinLocate

# 3. Install dependencies
npm install

# 4. Start the local development server
npm start
```

The application will open in your browser at `http://localhost:3000`.

---

## 🔑 API Information

PinLocate queries the public **Postal PIN Code API**:

- **Endpoint:** `https://api.postalpincode.in/pincode/{PINCODE}`
- **Authentication:** None required (no API keys or environment secrets needed).
- **Format:** JSON response containing status and an array of `PostOffice` objects (Name, District, State, BranchType, etc.).

---

## 📁 Project Structure

```text
PinLocate/
├── public/
│   ├── favicon.svg          # Scalable vector favicon
│   ├── favicon.ico          # Fallback icon
│   ├── index.html           # Main HTML document & Google Fonts
│   └── manifest.json        # Web app manifest
├── src/
│   ├── Components/
│   │   ├── AddressForm.js   # Address lookup form & logic
│   │   └── AddressForm.css  # Modern design system & responsive styling
│   ├── App.js               # Application layout (Header, Main, Footer)
│   ├── index.js             # React DOM entry point
│   └── setupTests.js        # Test configurations
├── package.json             # Scripts & dependencies
└── README.md                # Project documentation
```

---

## ⚙️ Available Scripts

In the project directory, you can run:

- `npm start`: Starts the development server.
- `npm run build`: Compiles the optimized production bundle.
- `npm test`: Launches the interactive test runner.

---

## 🚀 Deployment

PinLocate is deployed on **Vercel**:

- **Live URL:** [https://pin-locate.vercel.app/](https://pin-locate.vercel.app/)

To deploy your own instance:
1. Import the repository into [Vercel](https://vercel.com/) (or Netlify / GitHub Pages).
2. Build command: `npm run build`
3. Output directory: `build`

---

## 🧠 What I Learned

- Managing asynchronous API data flow and conditional UI states (loading, success, error) in React.
- Designing responsive, accessible forms with dynamic dependent dropdowns.
- Building a consistent CSS design token system (variables, typography scales, elevation, contrast).
- Implementing modern UX touches like digit counters, instant copy-to-clipboard, and non-intrusive loading indicators.

---

## 🔮 Future Improvements

- [ ] Interactive mini-map preview for selected localities.
- [ ] Reverse lookup (search PIN codes by city / area name).
- [ ] Offline caching for frequently queried PIN codes.
- [ ] TypeScript conversion for enhanced type safety.

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

This project is [MIT licensed](LICENSE).

---

## 👨‍💻 Author

- **GitHub:** [@ryavee](https://github.com/ryavee)
- **Repository:** [ryavee/PinLocate](https://github.com/ryavee/PinLocate)
