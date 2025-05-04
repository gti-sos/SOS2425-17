<script>
    fetch("http://localhost:16078/tiktok-data")
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("http://localhost:16078/onepiece-data")
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("http://localhost:16078/lol-data")
  .then(res => res.json())
  .then(data => console.log(data));
</script>