#!/usr/bin/env node

console.log('🧹 Auth State Cleaner')
console.log('====================\n')

console.log('This script will help you clear all authentication state.')
console.log('Please follow these steps:\n')

console.log('1. Open your browser DevTools (F12)')
console.log('2. Go to the Console tab')
console.log('3. Paste this code and press Enter:\n')

console.log(`
// Clear LocalStorage
localStorage.removeItem('user');
localStorage.removeItem('token');

// Clear Cookies
document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

// Show current auth state
console.log('Auth state after clearing:');
console.log('- User:', localStorage.getItem('user'));
console.log('- Token:', localStorage.getItem('token'));
console.log('- Cookie:', document.cookie.includes('auth-token'));

// Reload page
window.location.reload();
`)

console.log('\n4. The page will reload automatically')
console.log('5. You should now see the Login button in the navbar\n')

console.log('If you still have issues, try:')
console.log('- Hard refresh with Ctrl+F5')
console.log('- Clear browser cache and cookies')
console.log('- Open an incognito/private window')
