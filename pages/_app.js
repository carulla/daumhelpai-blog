import '@styles/globals.css';
import Post from './posts/[slug]';

function Application({ Component, pageProps }) {

  return (
  <>
  <Component {...pageProps} />
  <Post /> 
  </>
);
}

export default Application;
