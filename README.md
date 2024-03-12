- Last tested on 1.20.60
- Fill shaped patterns using custom command syntax
- v0.0.2 changes:
  - Various code improvements
  - Added rotated cylinder
  - Added rotated torus
  - Added pyramid
  - Cone and pyramid accepts a base smaller than the top measurement, to create inverted shapes

![Shape_Fill_2](https://github.com/bud-aj29/BE_Shape_Fill/assets/99773087/2a927d8e-709d-4d04-bb5b-305344cafa2e)

- *Fill area is limited by simulation distance. Turn up your sim distance for larger fills
- **Filling too large of an area can cause watchdog to trigger and close your world. Also a possibility of crashes
- ***Filling large areas with lag prone blocks increases possibility of crashes
- Accepts local coordinate forms "\~", "\~1", or "\~-1"
- Fill replaces all blocks in the provided shape/path
- Replace only replaces the specified block type in the provided shape/path
- Shell only replaces blocks on the edge of the shape/path
#
- Cylinder
  - Fill
    - Syntax: /scriptevent fill:cylinder \<center: x y z> \<radius> \<height> \<tileName: Block>
    - Example command: /scriptevent fill:cylinder 0 -59 0 75 20 glass
  - Replace
    - Syntax: /scriptevent replace:cylinder \<center: x y z> \<radius> \<height> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:cylinder 0 -59 0 75 20 glass grass
  - Shell
    - Syntax: /scriptevent shell:cylinder \<center: x y z> \<radius> \<height> \<tileName: Block>
    - Example command: /scriptevent shell:cylinder 0 -59 0 75 20 glass
#
- Cylinder Rotated
  - Fill
    - Syntax: /scriptevent fill:cylinder_rotated \<center: x y z> \<radius> \<length> \<tileName: Block>
    - Example command: /scriptevent fill:cylinder_rotated 0 -59 0 75 20 glass
  - Replace
    - Syntax: /scriptevent replace:cylinder_rotated \<center: x y z> \<radius> \<length> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:cylinder_rotated 0 -59 0 75 20 glass grass
  - Shell
    - Syntax: /scriptevent shell:cylinder_rotated \<center: x y z> \<radius> \<length> \<tileName: Block>
    - Example command: /scriptevent shell:cylinder_rotated 0 -59 0 75 20 glass
#
- Sphere
  - Fill
    - Syntax: /scriptevent fill:sphere \<center: x y z> \<radius> \<tileName: Block>
    - Example command: /scriptevent fill:sphere 0 -59 0 25 glass
  - Replace
    - Syntax: /scriptevent replace:sphere \<center: x y z> \<radius> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:sphere 0 -59 0 25 glass grass
  - Shell
    - Syntax: /scriptevent shell:sphere \<center: x y z> \<radius> \<tileName: Block>
    - Example command: /scriptevent shell:sphere 0 -59 0 25 glass
#
- Hemisphere
  - Fill
    - Syntax: /scriptevent fill:hemisphere \<center: x y z> \<radius> \<half: top/bottom> \<tileName: Block>
    - Example command: /scriptevent fill:hemisphere 0 -59 0 25 top glass
  - Replace
    - Syntax: /scriptevent replace:hemisphere \<center: x y z> \<radius> \<half: top/bottom> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:hemisphere 0 -59 0 25 top glass grass
  - Shell
    - Syntax: /scriptevent shell:hemisphere \<center: x y z> \<radius> \<half: top/bottom> \<tileName: Block>
    - Example command: /scriptevent shell:hemisphere 0 -59 0 25 top glass
#
- Cone
  - Fill
    - Syntax: /scriptevent fill:cone \<center: x y z> \<bottom radius> \<top radius> \<height> \<tileName: Block>
    - Example command: /scriptevent fill:cone 0 -59 0 75 10 20 glass
  - Replace
    - Syntax: /scriptevent replace:cone \<center: x y z> \<bottom radius> \<top radius> \<height> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:cone 0 -59 0 75 10 20 glass grass
  - Shell
    - Syntax: /scriptevent shell:cone \<center: x y z> \<bottom radius> \<top radius> \<height> \<tileName: Block>
    - Example command: /scriptevent shell:cone 0 -59 0 75 10 20 glass
#
- Torus
  - Fill
    - Syntax: /scriptevent fill:torus \<center: x y z> \<major radius> \<minor radius> \<tileName: Block>
    - Example command: /scriptevent fill:torus 0 -59 0 75 20 glass
  - Replace
    - Syntax: /scriptevent replace:torus \<center: x y z> \<major radius> \<minor radius> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:torus 0 -59 0 75 20 glass grass
  - Shell
    - Syntax: /scriptevent shell:torus \<center: x y z> \<major radius> \<minor radius> \<tileName: Block>
    - Example command: /scriptevent shell:torus 0 -59 0 75 20 glass
#
- Torus Rotated
  - Fill
    - Syntax: /scriptevent fill:torus_rotated \<center: x y z> \<major radius> \<minor radius> \<tileName: Block>
    - Example command: /scriptevent fill:torus_rotated 0 -59 0 75 20 glass
  - Replace
    - Syntax: /scriptevent replace:torus_rotated \<center: x y z> \<major radius> \<minor radius> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:torus_rotated 0 -59 0 75 20 glass grass
  - Shell
    - Syntax: /scriptevent shell:torus_rotated \<center: x y z> \<major radius> \<minor radius> \<tileName: Block>
    - Example command: /scriptevent shell:torus_rotated 0 -59 0 75 20 glass
#
- Pyramid
  - Fill
    - Syntax: /scriptevent fill:pyramid \<center: x y z> \<bottom width> \<top width> \<height> \<tileName: Block>
    - Example command: /scriptevent fill:pyramid ~ -60 ~ 30 1 50 prismarine
  - Replace
    - Syntax: /scriptevent replace:pyramid \<center: x y z> \<bottom width> \<top width> \<height> \<tileName: Block> \<replaceTileName: Block>
    - Example command: /scriptevent replace:pyramid ~ -61 ~ 30 1 50 prismarine grass
  - Shell
    - Syntax: /scriptevent shell:pyramid \<center: x y z> \<bottom width> \<top width> \<height> \<tileName: Block>
    - Example command: /scriptevent shell:pyramid ~ -60 ~ 30 1 50 prismarine
#
![Shape_Fill_4](https://github.com/bud-aj29/BE_Shape_Fill/assets/99773087/2fc6a795-396c-488e-8666-3dc22c3a280c)
