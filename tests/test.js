var expect = chai.expect;
describe('Scroll2Top', function(){
    var randomYGlobal;
    var randomYBlock;
    var testBlock = document.createElement('div');
    var innerBlock = document.createElement('div');

    innerBlock.style.height = '5000px';
    testBlock.style.height = '2000px';
    testBlock.style.overflow = 'auto';
    testBlock.appendChild(innerBlock);
    beforeEach(function(){
        document.body.appendChild(testBlock);
    });

    describe('#scrollTo Func', function(){
        it('return the Y coordinate correctly', function(done){
            randomYGlobal = Math.round(Math.random() * 5000);
            window.scrollTo(0, randomYGlobal);

            randomYBlock = Math.round(Math.random() * 5000);
            testBlock.scrollTop = randomYBlock;
            setTimeout(function(){
                expect(window.testScope.scrollTop(window)).to.equal(randomYGlobal);
                expect(window.testScope.scrollTop(testBlock)).to.equal(randomYBlock);
                done();
            }, 120);
        });
    });

    describe('#scroll2Top Func', function(){
        it('should return error message when no dom object pass in', function(){
            var re = window.testScope.scroll2Top();
            expect(re).to.equal('error');
        });
        it('should only execute once when Y coordinate is 0.', function(done){
            var spy = sinon.spy();
            testBlock.scrollTop = 0;
            setTimeout(function(){
                window.testScope.scroll2Top(testBlock, 1200, spy);
                expect(spy.callCount).to.equal(1);
                done();
            }, 200);
        });
        it('should execute more than one time when Y coordinate is not 0.', function(done){
            var spy = sinon.spy();
            testBlock.scrollTop = 2500;
            window.testScope.scroll2Top(testBlock, 1000, spy);
            setTimeout(function(){
                expect(spy.callCount > 1).to.equal(true);
                done();
            }, 1800);
        });
    });

    afterEach(function(){
        document.body.removeChild(testBlock);
    });
});