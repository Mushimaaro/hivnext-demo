function Footer() {

   const year = new Date().getFullYear();

   return (
      <footer className="footer">
         <h3>&copy; {year} Copyright. Design by CodeBite Studios.</h3>
      </footer>
   )
}

export default Footer