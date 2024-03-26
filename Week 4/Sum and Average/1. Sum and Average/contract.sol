pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(
        uint param1,
        uint param2,
        uint param3,
        uint param4
    ) external pure returns (uint, uint) {
        uint sum = param1 + param2 + param3 + param4;
        uint average = (param1 + param2 + param3 + param4) / 4;

        return (sum, average);
    }
}
