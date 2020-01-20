$(document).ready(function() {
    var t = $('#myTable').DataTable();
    var counter = 1;
 
    $('#addRow').on( 'click', function () {
        t.row.add( [
            '0',
            '.1',
            '.2',
            new Date(),
            null,
            null    
        ] ).draw( false );
 
        counter++;
    } );
 
    // Automatically add a first row of data
    // $('#addRow').click();
} );