module TFWeb
  class ReadMeProcessor # < Processor
    def match(file_name)
      return file_name.downcase == "readme.md"
    end

    def process(path_obj, child)
      child_path = path_obj.join(child)
      clean_child = "#{child_path.parent.basename}.md".downcase.gsub({" ": "_"})
      new_path = path_obj.join(clean_child)
      unless child_path.to_s != new_path.to_s
        puts "[readme]renaming #{child_path.to_s} to #{new_path.to_s} " if child_path.to_s != new_path.to_s

        File.rename(child_path.to_s, new_path.to_s) if child_path.to_s != new_path.to_s
      end
    end
  end
end
