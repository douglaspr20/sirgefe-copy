export const handleMouseDown = (
  event: any,
  index: number,
  columnWidths: number[],
  handleResize: (index: number, newWidth: number) => void,
) => {
  const initialWidth = columnWidths[index];

  const prevX = event.clientX;
  document.body.style.cursor = 'col-resize';
  const onMouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - prevX;

    const newWidth = initialWidth + deltaX;

    if (newWidth > 0) {
      handleResize(index, newWidth);
    }
  };
  const onMouseUp = () => {
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
