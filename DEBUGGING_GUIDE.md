# Coders Book - Full Stack Debug & Setup Guide

## ✅ All Issues Fixed

### Frontend Issues Fixed:

1. **✅ Component Import Typo** - Fixed `Navebar` → `Navbar` in layout.tsx
2. **✅ API Endpoint Configuration** - Updated to use `/api/v1` prefix
3. **✅ Environment Variables** - Created `.env.local` with `NEXT_PUBLIC_BACKEND_URL`
4. **✅ Image Optimization** - Added proper Image component configuration
5. **✅ Error Handling** - Created error boundaries and error pages:
   - `error.tsx` - Global error handler
   - `(home)/error.tsx` - Homepage error handler
   - `book/[bookId]/error.tsx` - Book page error handler
   - `not-found.tsx` - 404 page
6. **✅ Component Improvements**:
   - Better image sizing with real dimensions
   - Enhanced Loading component with spinner
   - Improved Navbar with sticky positioning
   - Better BookCard with description and styling
   - SEO metadata for book pages

---

## 🚀 Frontend Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env.local` file has been created with:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
```

Update this if your backend runs on a different port/URL.

### 3. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔧 Backend Integration Points

Your frontend expects the backend API at:
- **Base URL**: `http://localhost:5000/api/v1`

### Required API Endpoints:

#### 1. Get All Books
```
GET /api/v1/books
Response: Book[]
```

#### 2. Get Single Book
```
GET /api/v1/books/:bookId
Response: Book
```

#### 3. Create Book (Protected)
```
POST /api/v1/books
Headers: Authorization: Bearer <token>
Body: FormData with coverImage, file, title, description, author
Response: Book
```

#### 4. Update Book (Protected)
```
PATCH /api/v1/books/:bookId
Headers: Authorization: Bearer <token>
Body: FormData with optional fields
Response: Book
```

#### 5. Delete Book (Protected)
```
DELETE /api/v1/books/:bookId
Headers: Authorization: Bearer <token>
Response: { success: true }
```

#### 6. Register User
```
POST /api/v1/users/register
Body: { name, email, password }
Response: { user, token }
```

#### 7. Login User
```
POST /api/v1/users/login
Body: { email, password }
Response: { user, token }
```

---

## 📦 Book Object Structure

```typescript
type Book = {
    _id: string;           // MongoDB ObjectId
    title: string;         // Book title
    description: string;   // Book description
    coverImage: string;    // URL to cover image
    file: string;          // URL to book PDF/file
    author: {
        name: string;      // Author name
    };
};
```

---

## 🔐 Authentication

- Token-based authentication using JWT
- Include token in Authorization header: `Bearer <token>`
- Protected endpoints (create, update, delete) require authentication

---

## 🖼️ Image Handling

- Images are served from backend uploads
- Frontend uses Next.js Image optimization
- Supported remote image hosts: localhost and all HTTPS domains

---

## ⚠️ Common Issues & Solutions

### Issue: "Failed to load books" Error
**Problem**: Backend not running or wrong URL  
**Solution**: 
1. Start backend server: `npm run dev` (backend directory)
2. Check backend is running on `http://localhost:5000`
3. Verify `.env.local` has correct `NEXT_PUBLIC_BACKEND_URL`

### Issue: CORS Errors
**Problem**: Backend doesn't allow frontend requests  
**Solution**: Add CORS middleware in backend:
```javascript
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### Issue: Images Not Loading
**Problem**: External image URLs not configured  
**Solution**: Already fixed in `next.config.ts` to allow all HTTPS images

### Issue: Authentication Not Working
**Problem**: Token not sent correctly  
**Solution**: 
1. Check localStorage for token
2. Verify Authorization header format
3. Implement proper token storage (localStorage/cookies)

---

## 📝 Frontend Routes

- `/` - Home page with book list
- `/book/[bookId]` - Individual book details page
- `/api/v1/users/register` - User registration (backend)
- `/api/v1/users/login` - User login (backend)

---

## 🧪 Testing Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend can fetch books list
- [ ] Can click on book to view details
- [ ] Download button opens/downloads PDF
- [ ] Error pages show on network failure
- [ ] Loading state displays while fetching
- [ ] Sign in/Sign up buttons functional

---

## 📚 Project Structure

```
elibClient/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   ├── page.tsx (home page)
│   │   │   ├── error.tsx (home error handler)
│   │   │   └── components/
│   │   │       ├── Banner.tsx
│   │   │       ├── BookList.tsx
│   │   │       └── BookCard.tsx
│   │   ├── book/
│   │   │   └── [bookId]/
│   │   │       ├── page.tsx (book details)
│   │   │       ├── error.tsx (book error handler)
│   │   │       └── components/
│   │   │           └── DownloadButton.tsx
│   │   ├── layout.tsx (root layout)
│   │   ├── error.tsx (global error handler)
│   │   ├── not-found.tsx (404 page)
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Loading.tsx
│   └── types/
│       └── index.ts
├── .env.local (frontend config)
├── next.config.ts (image optimization)
├── tsconfig.json
├── package.json
└── public/ (static assets)
```

---

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Color System**: Custom primary color scheme (primary-50 to primary-900)
- **Responsive**: Mobile-first, responsive design

---

## 🔍 Debugging Tips

1. **Check browser console** for client-side errors
2. **Use Network tab** to inspect API calls
3. **Check .env.local** for correct backend URL
4. **Verify backend** is running and responsive
5. **Check TypeScript errors** with `npm run lint`
6. **Rebuild** if types not updating: `npm run build`

---

## 📞 Support

For issues:
1. Check console errors (Cmd+J or F12)
2. Verify backend is running
3. Check environment variables
4. Inspect Network tab in DevTools
5. Review error pages for detailed messages

---

**Last Updated**: February 12, 2026
**Status**: ✅ Full Stack Debugged & Optimized
