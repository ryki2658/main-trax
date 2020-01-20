
$(document).ready(function() {
  $('#walkTable').DataTable( {
    "order": [[ 2, "desc" ]],
    
  });
});

$(document).ready(function() {
  $('#jobsTable').DataTable( {
    "order": [[ 5, "asc" ], [7, 'desc']],
  });
});

$(document).ready(function() {
$('#myTable1').DataTable();
});

$(document).ready(function() {
  $('#adminTable').DataTable( {
    "order": [[ 3, "desc" ],[ 6, "asc" ]],
  });
});