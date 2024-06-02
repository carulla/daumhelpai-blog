import '@styles/globals.css';
import Post from '../.next/static/chunks/pages/posts/[slug]';

function Application({ Component, pageProps }) {

  return (
  <>
  <Component {...pageProps} />
  <Post /> 
  </>
);
}

export default Application;
