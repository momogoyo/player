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
  ),
  volumeOn: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M1 13.857v-3.714a2 2 0 012-2h2.9a1 1 0 00.55-.165l6-3.956a1 1 0 011.55.835v14.286a1 1 0 01-1.55.835l-6-3.956a1 1 0 00-.55-.165H3a2 2 0 01-2-2z" stroke="var(--primary100)" stroke-width="1.5"></path><path d="M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4M20.5 4.5S23 7 23 11.5s-2.5 7-2.5 7" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  volumeOff: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#sound-off_svg__clip0_3173_16686)" stroke="var(--primary100)" stroke-width="1.5"><path d="M18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 13.857v-3.714a2 2 0 012-2h2.9a1 1 0 00.55-.165l6-3.956a1 1 0 011.55.835v14.286a1 1 0 01-1.55.835l-6-3.956a1 1 0 00-.55-.165H4a2 2 0 01-2-2z"></path></g><defs><clipPath id="sound-off_svg__clip0_3173_16686"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
  ),
  caption: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 15V9a6 6 0 016-6h10a6 6 0 016 6v6a6 6 0 01-6 6H7a6 6 0 01-6-6z" stroke="var(--primary100)" stroke-width="1.5"></path><path d="M10.5 10l-.172-.172a2.828 2.828 0 00-2-.828v0A2.828 2.828 0 005.5 11.828v.344A2.828 2.828 0 008.328 15v0c.75 0 1.47-.298 2-.828L10.5 14M18.5 10l-.172-.172a2.828 2.828 0 00-2-.828v0a2.828 2.828 0 00-2.828 2.828v.344A2.828 2.828 0 0016.328 15v0c.75 0 1.47-.298 2-.828L18.5 14" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round"></path></svg>
  ),
  pip: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="var(--primary100)" xmlns="http://www.w3.org/2000/svg"><path d="M20.01 8l-.01.011M20.01 4l-.01.011M16.01 4l-.01.011M12.01 4l-.01.011M8.01 4L8 4.011M4.01 4L4 4.011M4.01 8L4 8.011M4.01 12l-.01.011M4.01 16l-.01.011M4.01 20l-.01.011M8.01 20l-.01.011M20.01 12.01v8h-8v-8h8z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  ),
  setting: () => (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="var(--primary100)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  )
  
}

export default Icon