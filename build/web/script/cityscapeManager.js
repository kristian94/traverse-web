function getCityscapeManager(mainParentIn) {
    return Object.seal({
        mainParent: mainParentIn,
        leftOffset: -2,
        botOffset: -1
                -2
        ,
        houseSpacing: -1,
        zIndexOffset: -2,
        minWidth: 1.5,
        minHeight: 1.5,
        dimensionSets: [
            {height: 13, width: 2.5}
            , {height: 12, width: 2}
            , {height: 11, width: 3}
            , {height: 8, width: 3}
            , {height: 7, width: 4}
            , {height: 5, width: 2}
            , {height: 4, width: 6}
            , {height: 3, width: 2}
        ],
        colorThemes: [
//            {
//                brightA: '#4F5157',
//                brightB: '#6A6C73',
//                mediumA: '#35373B',
//                mediumB: '#2C2D30',
//                darkA: '#27282B',
//                darkB: '#4A4D52'
//            }
            {
                brightA: '#8C6E5F',
                brightB: '#8C7964',
                mediumA: '#735D53',
                mediumB: '#736253',
                darkA: '#574B45',
                darkB: '#574444'
            },
            {
                brightA: '#6A8C5F',
                brightB: '#5F8C68',
                mediumA: '#566651',
                mediumB: '#4F6353',
                darkA: '#2F362C',
                darkB: '#2C362D'
            }
        ],
        windowColors: [
//            '#DED592',
//            '#EDBEBE',
//            '#C7C0CF',
//            '#E8DCE1'
            '#9BB1CF'
        ],
        lastPlacedHouse: null,
        appendNewHouse: function (widthIn, heightIn, colorTheme) {
            var house = document.createElement('div');
            var houseSide = document.createElement('div');
            var houseTop = document.createElement('div');
            var houseFront = document.createElement('div');


            var fullWidth = this.minWidth + widthIn;



            // WIDTHS
//            $(house).css('width', widthHouse + 'em');
            $(houseSide).css('width', this.minWidth + 'em');
            $(houseTop).css('width', widthIn + 'em');
            $(houseFront).css('width', widthIn + 'em');

            //HEIGHTS
//            $(house).css('height', heightHouse + 'em');
            $(houseSide).css('height', heightIn + 'em');
            $(houseTop).css('height', this.minHeight + 'em');
            $(houseFront).css('height', heightIn + 'em');

            //COLORS
            var twoColorRightGradient = function (colorA, colorB) {
                return 'linear-gradient(to right, ' + colorA + ', ' + colorB + ')';
            };

            var colorHouseSide = twoColorRightGradient(colorTheme.brightA, colorTheme.brightB);
            var colorHouseTop = twoColorRightGradient(colorTheme.mediumA, colorTheme.mediumB);
            var colorHouseFront = twoColorRightGradient(colorTheme.darkA, colorTheme.darkB);

            $(houseSide).css('background', colorHouseSide);
            $(houseTop).css('background', colorHouseTop);
            $(houseFront).css('background', colorHouseFront);

            //SKEW
            $(houseSide).css('transform', 'skewY(45deg)');
            $(houseTop).css('transform', 'skewX(45deg)');

            //POSITION
//            $(house).css('position', 'fixed');
            $(houseSide).css('position', 'fixed');
            $(houseTop).css('position', 'fixed');
            $(houseFront).css('position', 'fixed');

            //LEFT
            var leftHouseSide = this.leftOffset;
            var leftHouseTop = this.leftOffset + (this.minWidth / 2);
            var leftHouseFront = this.leftOffset + this.minWidth;

            $(houseSide).css('left', leftHouseSide + 'em');
            $(houseTop).css('left', leftHouseTop + 'em');
            $(houseFront).css('left', leftHouseFront + 'em');

            //BOT
            var botHouseSide = this.botOffset + (this.minHeight / 2);
            var botHouseTop = this.botOffset + heightIn;
            var botHouseFront = this.botOffset;

            $(houseSide).css('bottom', botHouseSide + 'em');
            $(houseTop).css('bottom', botHouseTop + 'em');
            $(houseFront).css('bottom', botHouseFront + 'em');

            //Z-INDEX
            $(houseSide).css('z-index', this.zIndexOffset - 2);
            $(houseTop).css('z-index', this.zIndexOffset - 1);
            $(houseFront).css('z-index', this.zIndexOffset);

            //WINDOWS
            var spaceLeft = heightIn;
            var windowMinWidth = 0.25;
            var windowMinHeight = 0.5;
            var topOffset = 0;
            var leftOffset = 0;

//            for(var i = 10; i > 0; i--){
//                
//            }
//            for (var i = 0, max = 5; i < max; i++) {
//                var currentTop = topOffset + 0.125;
//                var currentLeft = leftOffset + 0.125;
//                var window = document.createElement('div');
//                $(window).css('position', 'absolute');
//                $(window).css('width', windowMinWidth+'em');
//                $(window).css('height', windowMinHeight+'em');
//                $(window).css('top', currentTop+'em');
//                $(window).css('left', currentLeft+'em');
//                $(window).css('background', 'black');
//                $(window).css('background', 'radial-gradient(closest-corner at 50%, #EDDA5C 30%, #BF7C4D)');
//                $(window).css('box-shadow', '-0.015em 0.015em 0em #9C6549');
//                $(houseFront).append(window);
//                topOffset += 0.75;
//                leftOffset += 0.5;
//            }
            var outOfBoundsLeft = false;
            var outOfBoundsTop = false;
            var windowSpacing = 1;


            var windows = [];

            while (!outOfBoundsTop) {
                while (!outOfBoundsLeft) {
                    var currentTop = topOffset + (0.125 * windowSpacing);
                    var currentLeft = leftOffset + (0.125 * windowSpacing);
                    var window = document.createElement('div');
                    $(window).css('position', 'absolute');
                    $(window).css('width', windowMinWidth + 'em');
                    $(window).css('height', windowMinHeight + 'em');
                    $(window).css('top', currentTop + 'em');
                    $(window).css('left', currentLeft + 'em');
                    $(window).css('opacity', '0.5');
                    var windowDice = Math.floor((Math.random() * 6 + 1)) - 1;

                    if (windowDice === 0) {
                        // WINDOW OFF
                        $(window).css('background', 'rgba(191, 124, 77, 0.4)');
                    } else {
                        // WINDOW ON
                        $(window).css('background', 'radial-gradient(closest-corner at 30% 40%, #EDDA5C 40%, rgba(191, 124, 77, 0.6))');
                    }

//                    $(window).css('background', 'radial-gradient(closest-corner at 30% 40%, #EDDA5C 40%, rgba(191, 124, 77, 0.6))');
//                    $(window).css('box-shadow', '-0.015em 0.015em 0em #9C6549');
//                    $(houseFront).append(window);
                    windows.push(window);
                    leftOffset += 0.5 * windowSpacing;

                    if (leftOffset + 0.5 > widthIn) {
                        outOfBoundsLeft = true;
                    }
                }
                $(houseFront).append(windows);
                leftOffset = 0;
                topOffset += 0.75 * windowSpacing;
                outOfBoundsLeft = false;
                if (topOffset > heightIn)
                    outOfBoundsTop = true;
            }





            $(house).append(houseTop, houseSide, houseFront);
            $(this.mainParent).append(house);
//            this.lastPlacedHouse = house;

            this.leftOffset += fullWidth + this.houseSpacing;

            house;
        },
        updateCity: function () {
            var fontSizeInPx = Number($(this.mainParent).css('font-size').replace('px', ''));
            var leftOffsetInPx = this.leftOffset * fontSizeInPx;
            if (leftOffsetInPx < $(window).width()) {
                this.renderCity();
            }

        },
        renderCity: function () {
            var fontSizeInPx = Number($(this.mainParent).css('font-size').replace('px', ''));
            var outOfBounds = false;

            while (!outOfBounds) {
                var dimensionIndex = Math.floor((Math.random() * this.dimensionSets.length + 1)) - 1;
                var colorThemeIndex = Math.floor((Math.random() * this.colorThemes.length + 1)) - 1;
                var currentSet = this.dimensionSets[dimensionIndex];
                this.appendNewHouse(currentSet.width, currentSet.height, this.colorThemes[colorThemeIndex]);
                this.zIndexOffset -= 3;
                var leftOffsetInPx = this.leftOffset * fontSizeInPx;
                if (leftOffsetInPx > $(window).width()) {
                    outOfBounds = true;
                }


            }

        },
        makeCity: function () {
            $(this.mainParent).hide();
            this.renderCity();
            $(this.mainParent).fadeTo(1000, 1, function () {
            });

        }



    });

}



