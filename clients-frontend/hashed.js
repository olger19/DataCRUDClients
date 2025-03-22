const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash('superadmin', 10);
  console.log(hashedPassword);
})();