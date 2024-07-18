export function addHandJointCapacity($container) {
  let isDrawing = false;

  function onPointerDown(e) {
    e.preventDefault();
    isDrawing = true;
  }

  function onPointerMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
  }

  function onPointerUp(e) {
    e.preventDefault();
    isDrawing = false;
  }

  $container.addEventListener("pointerdown", onPointerDown);
  $container.addEventListener("pointermove", onPointerMove);
  $container.addEventListener("pointerup", onPointerUp);

  return () => {
    $container.removeEventListener("pointerdown", onPointerDown);
    $container.removeEventListener("pointermove", onPointerMove);
    $container.removeEventListener("pointerup", onPointerUp);
  };
}
