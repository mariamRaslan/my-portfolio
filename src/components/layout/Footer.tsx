function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10 py-6">
      <div className="container mx-auto text-sm text-white/60 sm:flex-row">
        <p className="text-center">
          © {year} Mariam Raslan. All rights reserved.
        </p>

     
      </div>
    </footer>
  );
}

export default Footer;
