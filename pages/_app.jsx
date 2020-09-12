import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import 'react-flags-select/css/react-flags-select.css';
import configureStore from '../redux/store';
import { appWithTranslation } from '../i18n';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    // Anything returned here can be access by the client
    return { pageProps: pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
        <style jsx>{`
          :global(body) {
            margin: 0;
          }
        `}</style>
      </Provider>
    );
  }
}

const makeStore = () => configureStore();

export default withRedux(makeStore)(appWithTranslation(MyApp));
