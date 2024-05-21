document.getElementById('draw-button').addEventListener('click', function() {
    var year = document.getElementById('year-input').value;
    if (year) {
      var url = 'https://v3s1ug2ohi.execute-api.us-east-2.amazonaws.com/prod/boston?year=' + year;
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          drawGraph(data);
        })
        .catch(function(error) {
          console.log('Error fetching data:', error);
        });
    } else {
      console.log('Please enter a year');
    }
  });
  
  function drawGraph(data) {
    var counts = data['bin_0_count'];
    var years = Object.keys(counts);
    var values = Object.values(counts);
  
    var margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 700 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
  
    var svg = d3
      .select('#graph')
      .html('')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
    var xScale = d3.scaleBand().range([0, width]).padding(0.1);
    var yScale = d3.scaleLinear().range([height, 0]);
  
    xScale.domain(years);
    yScale.domain([0, d3.max(values)]);
  
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));
  
    svg.append('g').call(d3.axisLeft(yScale));
  
    svg
      .selectAll('.bar')
      .data(values)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d, i) {
        return xScale(years[i]);
      })
      .attr('width', xScale.bandwidth())
      .attr('y', function(d) {
        return yScale(d);
      })
      .attr('height', function(d) {
        return height - yScale(d);
      })
      .attr('fill', 'steelblue');
  
    svg
      .selectAll('.bar-label')
      .data(values)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', function(d, i) {
        return xScale(years[i]) + xScale.bandwidth() / 2;
      })
      .attr('y', function(d) {
        return yScale(d) - 5;
      })
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d;
      });
  }
  