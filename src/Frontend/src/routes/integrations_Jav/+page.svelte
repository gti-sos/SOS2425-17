Hola mundo

<script>
  fetch('http://localhost:16078/apiInternet/teams')
  .then(res => res.json())
  .then(data => console.log(data));


  fetch("http://localhost:16078/boxing-data")
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("http://localhost:16078/api-movies")
  .then(res => res.json())
  .then(data => console.log(data));
</script>