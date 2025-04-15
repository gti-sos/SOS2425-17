
<script>
    import { Container } from '@sveltestrap/sveltestrap';
</script>


<style>
    .nav-link {
        text-decoration: none ; 
        font-size: 1.2rem; 
        color:black;
        display: inline-block;
        margin: 0.15px;
    }

    .nav-link:hover {
        text-decoration: none ; 
        color:black;
        background-color: blue;
    }
</style>

<Container fluid style="text-align: center; background-color:gray; padding : 20px">
    <a href="/" class="nav-link">Home</a>
    <a href="/university-demands" class="nav-link">University-demands</a>

</Container>
  