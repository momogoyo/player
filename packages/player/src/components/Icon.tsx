import { h } from 'preact'

const Icon = {
  play: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  pause: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M6 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6zM14 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6z" stroke="var(--primary100)" stroke-width="1.5"></path></svg>
  ),
  next: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M18 7v10M6.972 5.267A.6.6 0 006 5.738v12.524a.6.6 0 00.972.47l7.931-6.261a.6.6 0 000-.942L6.972 5.267z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  prev: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M6 7v10M17.028 5.267a.6.6 0 01.972.471v12.524a.6.6 0 01-.972.47l-7.931-6.261a.6.6 0 010-.942l7.931-6.262z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  expand: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M9 9L4 4m0 0v4m0-4h4M15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4M15 15l5 5m0 0v-4m0 4h-4" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  collapse: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M20 20l-5-5m0 0v4m0-4h4M4 20l5-5m0 0v4m0-4H5M20 4l-5 5m0 0V5m0 4h4M4 4l5 5m0 0V5m0 4H5" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  )
}

export default Icon