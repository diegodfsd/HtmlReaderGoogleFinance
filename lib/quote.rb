require "hpricot"
require "rest-open-uri"

class Quote

  class << self
    def extract! quote
      page = open("http://www.google.com/finance?q=#{quote}") { |html| Hpricot(html) }

      tags = Hash.new
      tags[:nick] = "#searchmore"
      tags[:name] = "div[@class='g-unit g-first']/h3"
      tags[:price] = "span[@class='ch bld']"
      tags[:prb] = "span[@class='pr']"

      tags.inject({}) do |hash, tag |
        hash[tag[0]] = page.at(tag[1]).inner_text
        hash
      end
    end
  end
end