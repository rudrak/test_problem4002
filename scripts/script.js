$('.movable')
    .on('dragstart', function (evt) {
        //evt.preventDefault();
        evt.stopPropagation();
        evt.originalEvent.dataTransfer.setData('text', this);
        console.log('dragstart');
        $(this).fadeOut();
        enableContainerDragListeners($(this));
    })
    .on('dragend', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('dragend');
        $(this).fadeIn('slow');
        disableContainerDragListeners($(this));
    });

var enableContainerDragListeners = function(draggedElement){
    $('.container-box')
        .on('dragenter', handleContainerDragEnter)
        .on('dragleave', handleContainerDragLeave);
};

var disableContainerDragListeners = function (draggedElement) {
    $('.container-box')
        .off('dragenter', handleContainerDragEnter)
        .off('dragleave', handleContainerDragLeave);
};

var handleContainerDrop = function (evt) {
    evt.preventDefault();
    //evt.stopPropagation();
    console.log(evt.originalEvent.dataTransfer.getData('text'));
    console.log('dropped');
    //here we need to check if the drop happened inside the container or outside.
};

var handleContainerDragEnter = function (evt) {
    //evt.preventDefault();
    console.log('drag entered the container-box');
    $(this).css('border-style', 'dashed');
    this.addEventListener('drop', handleContainerDrop);
};

var handleContainerDragLeave = function (evt) {
    // evt.preventDefault();
    console.log('drag left the container-box');
    $(this).css('border-style', 'none');
    this.removeEventListener('drop', handleContainerDrop);
};

