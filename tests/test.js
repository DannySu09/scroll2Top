var expect = chai.expect;
describe('Scroll2Top', function(){
    var randomYGlobal;
    var randomYBlock;
    var testBlock;
    var innerBlock;
    beforeEach(function(){
        testBlock = document.createElement('div');
        innerBlock = document.createElement('div');
        innerBlock.style.height = '5000px';
        testBlock.style.height = '2000px';
        testBlock.style.overflow = 'auto';
        testBlock.appendChild(innerBlock);
        document.body.appendChild(testBlock);

        randomYGlobal = Math.round(Math.random() * 5000);
        window.scrollTo(0, randomYGlobal);

        randomYBlock = Math.round(Math.random() * 5000);
        testBlock.scrollTop = randomYBlock;
    });

    describe('#scrollTo Func', function(){
        it('return the Y coordinate correctly', function(done){
            setTimeout(function(){
                expect(window.testScope.scrollTop(window)).to.equal(randomYGlobal);
                expect(window.testScope.scrollTop(testBlock)).to.equal(randomYBlock);
                done();
            }, 1000);
        });
    });

    describe('#scroll2Top Func', function(){
        it('should return error message when no dom object pass in', function(){
            var re = window.testScope.scroll2Top();
            expect(re).to.equal('error');
        });
        it('should only execute once when Y coordinate is 0.', function(){
            var spy = sinon.spy();
            testBlock.scrollTop = 0;
            window.testScope.scroll2Top(testBlock, 1200, spy);
            expect(spy.callCount).to.equal(1);
        });
        it('should execute more than one time when Y coordinate is not 0.', function(){
            var callCount = 0;
            var spy = function(){
                callCount += 1;
                console.log(callCount);
            };
            testBlock.scrollTop = 2500;
            window.testScope.scroll2Top(testBlock, 1000, spy);
            expect(callCount > 1).to.equal(true);
        });
    });
});