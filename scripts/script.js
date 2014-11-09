(function ($) {
    $.fn.dragganetor = function (options) {
        var borderStyle = options.borderStyle;

        // Supereme fuck all situational hack// find something better to do
        var handleContainerDragOver = function () {
            return false;
        }

        var handleContainerDrop = function (evt) {
            evt.preventDefault();
            var $domBox = $('#'+evt.originalEvent.dataTransfer.getData('text'));
            $(this).append($domBox);
            $domBox.fadeIn();
            handleContainerDragLeave.call(this);
        };

        var handleContainerDragEnter = function (evt) {
            $(this).css('border-style', borderStyle);
        };

        var handleContainerDragLeave = function (evt) {
            $(this).css('border-style', 'none');
        };

        this.init = function () {
            var that = this;
            $(this).find('.movable')
                .on('dragstart', function (evt) {
                    evt.stopPropagation();
                    evt.originalEvent.dataTransfer.setData('text', $(this).attr('id'));
                    $(this).fadeOut();
                    enableContainerDragListeners.call(this, $(this));
                })
                .on('dragend', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $(this).fadeIn('slow');
                    disableContainerDragListeners.call(this, $(this));
                });
        };

        var enableContainerDragListeners = function(draggedElement){
            $(this).siblings('.container-box')
                .on('dragenter', handleContainerDragEnter)
                .on('dragleave', handleContainerDragLeave)
                .on('dragover', handleContainerDragOver)//this is SUPER weird thing to do 
                .on('drop', handleContainerDrop);
        };

        var disableContainerDragListeners = function (draggedElement) {
            $(this).siblings('.container-box')
                .off('dragenter', handleContainerDragEnter)
                .off('dragleave', handleContainerDragLeave)
                .off('dragover', handleContainerDragOver)// !!! 
                .off('drop', handleContainerDrop);
        };

        this.init();
        return $(this);
    }
})(jQuery);

$(document).ready(function () {
    var drag1 = $('#drag-drop').dragganetor({
        borderStyle : 'dashed'
    });
});