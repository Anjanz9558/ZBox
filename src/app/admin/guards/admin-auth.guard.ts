import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('myToken');

  if (!token) {
    router.navigate(['/admin/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;

    if (!expiry || Date.now() >= expiry * 1000) {
      localStorage.removeItem('myToken');
      router.navigate(['/admin/login']);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Invalid token', err);
    localStorage.removeItem('myToken');
    router.navigate(['/admin/login']);
    return false;
  }
};
