export function lineToPath({ startPoint, inflectionPoints, endPoint }) {
  return `M ${startPoint.x},${startPoint.y} C ${pointsToPath(
    inflectionPoints
  )} ${endPoint.x},${endPoint.y}`;
}

function pointsToPath(points) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}
