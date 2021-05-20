import MainHeader from './main-header';

function layout({ children }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

export default layout;
