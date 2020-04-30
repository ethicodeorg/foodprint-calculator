import classNames from 'classnames';

const PageTitle = ({ xl, children }) => (
  <h3
    className={classNames('page-title', {
      'page-title-xl': xl,
    })}
  >
    {children}

    <style jsx>{`
      .page-title {
        margin: 85px 0 0;
        font-size: 48px;
        font-weight: normal;
        text-align: center;
      }
      .page-title-xl {
        font-size: 104px;
      }
    `}</style>
  </h3>
);

export default PageTitle;
