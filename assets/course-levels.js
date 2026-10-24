(function () {
  var levelOrder = ["Foundation", "N5", "N4", "N3", "N2", "N1"];
  var descriptions = {
    Foundation: "Start here to build kana, essential vocabulary and sentence foundations.",
    N5: "Beginner Japanese for everyday words, basic kanji and simple sentences.",
    N4: "Strengthen elementary Japanese and read longer, connected sentences.",
    N3: "Bridge into intermediate Japanese with broader vocabulary and grammar.",
    N2: "Develop upper-intermediate accuracy for detailed reading and expression.",
    N1: "Train advanced vocabulary, kanji and nuanced Japanese comprehension."
  };

  function levelFor(card) {
    var href = card.getAttribute("href") || "";
    var match = href.match(/\/n([1-5])\//);
    return match ? "N" + match[1] : "Foundation";
  }

  function trackRank(card) {
    var href = card.getAttribute("href") || "";
    if (href.indexOf("hiragana") !== -1) return 0;
    if (href.indexOf("katakana") !== -1) return 1;
    if (href.indexOf("kanji") !== -1) return 2;
    if (href.indexOf("basic-words") !== -1 || href.indexOf("vocabulary") !== -1) return 3;
    if (href.indexOf("grammar-reading") !== -1) return 4;
    if (href.indexOf("manga") !== -1) return 5;
    return 6;
  }

  document.querySelectorAll(".course-map").forEach(function (map, mapIndex) {
    var cards = Array.prototype.slice.call(map.querySelectorAll(":scope > .course-card"));
    if (!cards.length) return;

    var groups = {};
    cards.forEach(function (card) {
      var level = levelFor(card);
      (groups[level] || (groups[level] = [])).push(card);
    });

    var availableLevels = levelOrder.filter(function (level) { return groups[level]; });
    var levels = document.createElement("div");
    levels.className = "course-levels";
    var nav = document.createElement("nav");
    nav.className = "level-jump";
    nav.setAttribute("aria-label", "Choose your Japanese level");

    availableLevels.forEach(function (level) {
      var slug = level.toLowerCase();
      var id = "course-map-" + mapIndex + "-" + slug;
      var jump = document.createElement("a");
      jump.href = "#" + id;
      jump.className = slug;
      jump.textContent = level === "Foundation" ? "Start with the basics" : "Practice " + level;
      nav.appendChild(jump);

      var section = document.createElement("section");
      section.id = id;
      section.className = "course-level " + slug;
      section.innerHTML = '<div class="level-heading"><span class="level-badge">' + level + '</span><div><h3>' + (level === "Foundation" ? "Build your foundation" : level + " training") + '</h3><p>' + descriptions[level] + '</p></div></div>';

      var grid = document.createElement("div");
      grid.className = "course-map";
      groups[level].sort(function (a, b) { return trackRank(a) - trackRank(b); }).forEach(function (card) {
        grid.appendChild(card);
      });
      section.appendChild(grid);
      levels.appendChild(section);
    });

    map.replaceWith(nav, levels);
  });
})();
