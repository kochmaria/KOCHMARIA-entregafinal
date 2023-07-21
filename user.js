
const guardarUsuario = () => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

const userForm = document.getElementById('user-form');
  userForm.addEventListener('submit', function(event) {
   event.preventDefault();
    nombreUsuario = document.getElementById('nombreUsuario').value;
    if (nombreUsuario.trim() !== '') {
      // Mostrar popup de bienvenida con el nombre de usuario
      Swal.fire({
        icon: 'success',
        title: `¡Bienvenido, ${nombreUsuario}!`,
        text: '¡Disfruta de la tienda!',
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
      });

      // Mostrar el mensaje en la consola
      console.log(`${nombreUsuario} inscrito. ¡Bienvenido a la tienda!`);
    } else {
      // Mostrar popup de advertencia para que ingrese un nombre de usuario
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Debes ingresar un nombre de usuario.',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#007bff',
      });
    }
});
