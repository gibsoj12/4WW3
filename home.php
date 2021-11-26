<?php

function search_by_name($name)
{

    Header("Location: results-page.php?name=".$name);
    exit();

}

?>