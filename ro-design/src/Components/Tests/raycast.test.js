const {inside} = require("../Video/IVid");
const {isInside} = require("./raycast");
const pointInPolygon = require('point-in-polygon');
const classifyPoint = require("robust-point-in-polygon")

test('inside', () => {
    let polygon = [[0,0], [0,2], [2,0], [2,2]]
    let pt = [1,1]
    expect(classifyPoint(polygon, pt)).toStrictEqual(0);
    polygon = [[1619.40625, 443.734375],[1299.40625, 683.734375], [1619.40625, 683.734375], [1299.40625, 443.734375]]
    pt = [1458, 502]

    expect(classifyPoint(polygon, pt)).toStrictEqual(-1);
    // expect(classifyPoint( [[1299.40625, 443.734375],[1619.40625, 443.734375],
    //     [1299.40625, 683.734375],[1619.40625, 683.734375]], [1316, 553])).toStrictEqual(-1);
    expect(classifyPoint( [[1299, 443],[1619, 443],
        [1299, 683],[1619, 683]], [1316, 553])).toStrictEqual(-1);
});