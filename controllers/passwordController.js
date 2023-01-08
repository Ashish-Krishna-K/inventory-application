exports.authenticate_password_get = (req, res, next) => {
  res.render("password_screen", {
    title: "LOKED"
  })
}

exports.authenticate_password_post = (req, res, next) => {
  const password = 'TempAdminPassword'
  if (res.body.password === password) {
    res.redirect
  }
}