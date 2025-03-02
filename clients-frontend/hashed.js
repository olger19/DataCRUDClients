const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash('clave_123', 10);
  console.log(hashedPassword);
})();