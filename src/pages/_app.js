import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="main">
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
